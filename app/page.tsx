"use client";

import axios from 'axios';
import { useState } from 'react';

export default function Home() {

  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const API_KEY = 'nmXecf2gFPlUQhQvzz8BxVuhCjBfpCsU';


  const onCall = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append("apikey", "nmXecf2gFPlUQhQvzz8BxVuhCjBfpCsU");

      var raw = { "text1": `${text1}`, "text2": `${text2}` };
      console.log(raw);
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        // body: "{\"text1\": \"bla bla\", \"text2\": \"bla bbb\"}"
        body: JSON.stringify(raw)
      };

      // fetch("https://api.apilayer.com/nlp/similarity", requestOptions as any)
      //   .then(response => response.text())
      //   .then(result => setOutput(result))
      //   .catch(error => console.log('error', error));

      const res = await axios.post('https://api.apilayer.com/nlp/similarity', raw, {
        headers: {
          "apikey": "nmXecf2gFPlUQhQvzz8BxVuhCjBfpCsU"
        }
      })

      console.log("res__________________",res.data);
      setOutput(res.data?.result)
    } catch (error) {

    }
    setLoading(false)
  }
  console.log(loading);
  return (
    <main>
      <div className='min-h-screen w-full flex items-center justify-center'>
        <div className='h-[800px] w-[500px] bg-white py-6 px-2 rounded-md'>
          <form className='space-y-8' onSubmit={onCall}>
            <p>Similarity</p>
            <div >
              <label htmlFor="">Text ban đầu: </label>
              <input
                type="text"
                className='w-full bg-zinc-300 p-3 text-black rounded-md border-none focus:border-none focus:border-white'
                onChange={(e) => setText1(e.target.value)}
                value={text1}
              />
            </div>

            <div >
              <label htmlFor="">Text so sánh: </label>
              <input
                type="text"
                className='w-full bg-zinc-300 p-3 text-black rounded-md border-none focus:border-none focus:border-white'
                onChange={(e) => setText2(e.target.value)}
                value={text2}
              />
            </div>


            <div className='flex items-center justify-center'>
              <button
                type='submit'
                className='bg-black text-white px-6 py-2 rounded-md mx-auto'
                disabled={loading}
              >
                {loading ? 'Chờ tý ...' : 'Call'}
              </button>
            </div>
          </form>

          <div className='mt-12'>
            Kết quả: <span>{output}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
