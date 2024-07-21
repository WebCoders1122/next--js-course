"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// to get form data
const initialState: FormDataType = {
  name: "",
  email: "",
  feedback: "",
};

const Feedback = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  //from fields change handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, feedback } = formData;
    const response = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feedback }),
    });
    setFormData(initialState);
    router.push("/thankyou/");
    console.log(await response.json());
  };
  return (
    <form
      className='max-w-sm mx-auto'
      onSubmit={(e) => handleSubmit(e)}>
      <div className='mb-5'>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Your name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
          required
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Your email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={handleChange}
          value={formData.email}
          className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
          placeholder='name@flowbite.com'
          required
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='message'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          feedback
        </label>
        <textarea
          id='message'
          rows={4}
          name='feedback'
          value={formData.feedback}
          onChange={handleChange}
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Write your thoughts here...'
        />
      </div>

      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
        Submit feedback
      </button>
    </form>
  );
};
export default Feedback;

//typescript types
type FormDataType = {
  name: string;
  email: string;
  feedback: string;
};
