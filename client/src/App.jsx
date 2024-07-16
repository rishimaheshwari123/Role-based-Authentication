import React from "react";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./components/admin/Layout";
import Dashboard from "./components/admin/Dashboard";
import UserDashBoard from "./components/user/UserDashboard";
import User from "./components/user/Layout";
import AddProduct from "./components/admin/AddProduct";
import Product from "./pages/Product";
import Counter from "./components/Counter";
import Path from "./components/Path";
import PathName from "./components/PathName";
import News from "./pages/News";
import GetNews from "./pages/GetNews";
import Category from "./pages/Category";
import Post from "./pages/Post";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <div className="flex gap-5">
      {/* <Counter />
      <PathName /> */}
      <Routes>
        <Route path="/test/:id" element={<Path />} />
        <Route path="/news" element={<News />} />
        <Route path="/get" element={<GetNews />} />
        <Route path="/getCat" element={<Category />} />
        <Route path="/products" element={<Product />} />
        <Route path="/post" element={<Post />} />
        <Route path="/singlePost/:id" element={<SinglePost />} />
      </Routes>
      {/* 
      <Sidebar />
      <div className="flex-1 ml-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
    */}
      {/* Add other routes here 
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add" element={<AddProduct />} />
          </Route>
          <Route path="/user" element={<User />}>
            <Route path="dashboard" element={<UserDashBoard />} />
          </Route>
        </Routes>
      </div>
  */}
    </div>
  );
};

export default App;
