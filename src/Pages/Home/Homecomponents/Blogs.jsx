import React from "react";
import gpt from "./homeassets/gpt.jpg";
import gemini from "./homeassets/gemini.png";
import copilot from "./homeassets/copilot.jpg";
import midj from "./homeassets/midj.jpg";
import devin from "./homeassets/devin.png";
import bing from "./homeassets/bing.webp";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FaHeart } from "react-icons/fa";
const images = [];
const Blogs = () => {
  return (
    <div>
      <h2 className="text-black text-[28px] font-[800] text-center my-[40px]">
        Popular Blogs
      </h2>
      <div className="container ml-[30px] grid grid-cols-2 gap-[30px] place-items-center justify-center">
        <div className="w-[444px] h-[550px] bg-white p-[10px]  flex flex-col rounded-[10px] items-center shadow-[10px_10px_#cbd5e1]">
          <PhotoProvider>
            <PhotoView src={gpt}>
              <img
                className="w-[420px] h-[220px] mt-3 rounded-[15px] ]"
                src={gpt}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <h2 className="text-[28px] text-black font-[600] text-start">
            The first Ai breakthrough
          </h2>
          <h2 className="text-[16px] text-black text-start font-[400]">
            {" "}
            ChatGPT is an AI language model developed by OpenAI. It's designed
            to understand and generate human-like text based on the input it
            receives. ChatGPT's purpose is to assist users by providing
            information, answering questions, generating text, and engaging in
            conversations on various topics. While it doesn't possess
            consciousness or emotions, ChatGPT strives to be helpful and
            engaging in interactions with users
          </h2>
          <div className="flex flex-row p-[30px]">
            <button className="bg-cyan-400 rounded-[10px] py-[10px] px-[20px]">
              Read details
            </button>
            <FaHeart className="text-red-500 h-[40px] w-[40px] ml-[10px]" />
          </div>
        </div>
        <div className="w-[444px] h-[550px] bg-white p-[10px] flex flex-col rounded-[10px] items-center shadow-[10px_10px_#cbd5e1]">
          <PhotoProvider>
            <PhotoView src={gemini}>
              <img
                className="w-[420px] h-[220px] mt-3 rounded-[15px]"
                src={gemini}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <h2 className="text-[28px] text-black font-[600] text-start">
            The first Ai breakthrough
          </h2>
          <h2 className="text-[16px] text-black text-start font-[400]">
            {" "}
            ChatGPT is an AI language model developed by OpenAI. It's designed
            to understand and generate human-like text based on the input it
            receives. ChatGPT's purpose is to assist users by providing
            information, answering questions, generating text, and engaging in
            conversations on various topics. While it doesn't possess
            consciousness or emotions, ChatGPT strives to be helpful and
            engaging in interactions with users
          </h2>
          <div className="flex flex-row p-[30px]">
            <button className="bg-cyan-400 rounded-[10px] py-[10px] px-[20px]">
              Read details
            </button>
            <FaHeart className="text-red-500 h-[40px] w-[40px] ml-[10px]" />
          </div>
        </div>
        <div className="w-[444px] h-[550px] bg-white p-[10px] flex flex-col rounded-[10px] items-center shadow-[10px_10px_#cbd5e1]">
          <PhotoProvider>
            <PhotoView src={copilot}>
              <img
                className="w-[420px] h-[220px] mt-3 rounded-[15px]"
                src={copilot}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <h2 className="text-[28px] text-black font-[600] text-start">
            The first Ai breakthrough
          </h2>
          <h2 className="text-[16px] text-black text-start font-[400]">
            {" "}
            ChatGPT is an AI language model developed by OpenAI. It's designed
            to understand and generate human-like text based on the input it
            receives. ChatGPT's purpose is to assist users by providing
            information, answering questions, generating text, and engaging in
            conversations on various topics. While it doesn't possess
            consciousness or emotions, ChatGPT strives to be helpful and
            engaging in interactions with users
          </h2>
          <div className="flex flex-row p-[30px]">
            <button className="bg-cyan-400 rounded-[10px] py-[10px] px-[20px]">
              Read details
            </button>
            <FaHeart className="text-red-500 h-[40px] w-[40px] ml-[10px]" />
          </div>
        </div>
        <div className="w-[444px] h-[550px] bg-white p-[10px] flex flex-col rounded-[10px] items-center shadow-[10px_10px_#cbd5e1]">
          <PhotoProvider>
            <PhotoView src={midj}>
              <img
                className="w-[420px] h-[220px] mt-3 rounded-[15px]"
                src={midj}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <h2 className="text-[28px] text-black font-[600] text-start">
            The first Ai breakthrough
          </h2>
          <h2 className="text-[16px] text-black text-start font-[400]">
            {" "}
            ChatGPT is an AI language model developed by OpenAI. It's designed
            to understand and generate human-like text based on the input it
            receives. ChatGPT's purpose is to assist users by providing
            information, answering questions, generating text, and engaging in
            conversations on various topics. While it doesn't possess
            consciousness or emotions, ChatGPT strives to be helpful and
            engaging in interactions with users
          </h2>
          <div className="flex flex-row p-[30px]">
            <button className="bg-cyan-400 rounded-[10px] py-[10px] px-[20px]">
              Read details
            </button>
            <FaHeart className="text-red-500 h-[40px] w-[40px] ml-[10px]" />
          </div>
        </div>
        <div className="w-[444px] h-[550px] bg-white p-[10px] flex flex-col rounded-[10px] items-center shadow-[10px_10px_#cbd5e1]">
          <PhotoProvider>
            <PhotoView src={devin}>
              <img
                className="w-[420px] h-[220px] mt-3 rounded-[15px]"
                src={devin}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <h2 className="text-[28px] text-black font-[600] text-start">
            The first Ai breakthrough
          </h2>
          <h2 className="text-[16px] text-black text-start font-[400]">
            {" "}
            ChatGPT is an AI language model developed by OpenAI. It's designed
            to understand and generate human-like text based on the input it
            receives. ChatGPT's purpose is to assist users by providing
            information, answering questions, generating text, and engaging in
            conversations on various topics. While it doesn't possess
            consciousness or emotions, ChatGPT strives to be helpful and
            engaging in interactions with users
          </h2>
          <div className="flex flex-row p-[30px]">
            <button className="bg-cyan-400 rounded-[10px] py-[10px] px-[20px]">
              Read details
            </button>
            <FaHeart className="text-red-500 h-[40px] w-[40px] ml-[10px]" />
          </div>
        </div>
        <div className="w-[444px] h-[550px] bg-white p-[10px] flex flex-col rounded-[10px] items-center shadow-[10px_10px_#cbd5e1]">
          <PhotoProvider>
            <PhotoView src={bing}>
              <img
                className="w-[420px] h-[220px] mt-3 rounded-[15px]"
                src={bing}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <h2 className="text-[28px] text-black font-[600] text-start">
            The first Ai breakthrough
          </h2>
          <h2 className="text-[16px] text-black text-start font-[400]">
            {" "}
            ChatGPT is an AI language model developed by OpenAI. It's designed
            to understand and generate human-like text based on the input it
            receives. ChatGPT's purpose is to assist users by providing
            information, answering questions, generating text, and engaging in
            conversations on various topics. While it doesn't possess
            consciousness or emotions, ChatGPT strives to be helpful and
            engaging in interactions with users
          </h2>
          <div className="flex flex-row p-[30px]">
            <button className="bg-cyan-400 rounded-[10px] py-[10px] px-[20px]">
              Read details
            </button>
            <FaHeart className="text-red-500 h-[40px] w-[40px] ml-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
