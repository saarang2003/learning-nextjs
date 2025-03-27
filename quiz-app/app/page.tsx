'use client'
import { useState } from "react";
import Quiz from "./component/quiz";


export default function Home() {

  const [quizStarted , setQuizStarted] = useState<boolean>(false);
  const [name , setName] = useState<string>('');


  return (
    <div className="text-4xl font-bold text-center ">
      <div className="container mt-5 ml-5">
        <div>
          <h3>Quiz App</h3>
        </div>

        {
          quizStarted ? (
            <Quiz name={name} />
             
          ) : (
            <> 
            <div className="mb-3">
              <label htmlFor="name">Enter your name below👇</label>

              <input type="text" className="border mt-3" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <button 
            onClick={() => setQuizStarted(true)}
            disabled = {!name.trim()}
            className="bg-blue-500 rounded-lg p-3 text-white  cursor-pointer"
            >
              Start Quiz
            </button>
          
          </>
          )
        }

      </div>
    </div>
  );
}
