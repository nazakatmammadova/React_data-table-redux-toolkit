import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import axios from "axios";

let baseUrl = "https://66c246eef83fffcb587b9248.mockapi.io/employees";

export const getData=createAsyncThunk("users/getData",async(value)=>{
   try{
      const response=await axios.get(baseUrl)
      if(value){
         return response?.data.filter(e=>e.name.toLowerCase().startsWith(value.toLowerCase()))
      }else{
         return response?.data;  
      }
   }catch(error){
      toast.error(`xeta mesaji: ${error.message}`);
   }
});
export const postData=createAsyncThunk("users/postData",async(newData)=>{
   try{
      const response=await axios.post(baseUrl,newData)
      toast.success(`${response.data.name} adli istifadeci ugurla elave edildi!`);
      return response?.data;  
   }catch(error){
      toast.error(`xeta mesaji: ${error.message}`);
   }
});

export const putData = createAsyncThunk("users/putData", async ({ id, updatedData }) => {
   try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedData);
      toast.success(`${response.data.name} adli istifadeci ugurla yenilendi!`);
      return response?.data;  
   } catch (error) {
      toast.error(`xeta mesaji: ${error.message}`);
   }
});

export const deleteData = createAsyncThunk("users/deleteData", async (id) => {
   try {
      await axios.delete(`${baseUrl}/${id}`);
      toast.success("Istifadeci silindi!");
      return id;  
   } catch (error) {
      toast.error(`xeta mesaji: ${error.message}`);
   }
});

export const tableSlice = createSlice({
  name: 'datatable',
  initialState:{
      users:[],
  },
   extraReducers:(builder)=>{
      builder
      .addCase(getData.fulfilled,(state,action)=>{
         state.users=action.payload         
      })
      .addCase(postData.fulfilled,(state,action)=>{
         state.users.push(action.payload)
      })
      .addCase(putData.fulfilled,(state,action)=>{
         const index = state.users.findIndex(user => user.id === action.payload.id);
         if (index !== -1) {
            state.users[index] = action.payload;
         }
      })
      .addCase(deleteData.fulfilled,(state,action)=>{
         state.users = state.users.filter(user => user.id !== action.payload);
      })
   }
})


export default tableSlice.reducer