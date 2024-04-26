'use client';
 
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef, useEffect } from 'react'
import { ModeToggle } from './ThemeSwitch';
 
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatParent = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const domNode = chatParent.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  }, [messages])
 
  return (
    <div className='flex flex-col w-full h-screen max-h-dvh bg-background md:px-24 lg:px-48 xl:px-72 mx-auto'>

        <header className=' w-full flex justify-between items-center bg-slate-100 dark:bg-slate-800 border-b py-4 px-8 md:px-16'>
            <h1 className='text-3xl text-center font-bold dark:text-white'>AI Chat</h1>
            <ModeToggle />
        </header>

        <section ref={chatParent} className=' flex-grow bg-slate-50 dark:bg-slate-700 overflow-y-auto'>
            {messages.map(m => (
                <div key={m.id}>
                    {m.role === 'user' ? (
                        <div className='flex justify-end pl-10 sm:pl-16 md:pl-24 lg:pl-36 xl:pl-64'>
                            <div className='bg-green-200 dark:bg-green-800 text-black dark:text-white py-2 px-4 m-4 rounded-md shadow-md w-fit'>
                            <p className='break-all whitespace-pre-line'>{m.content}</p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-start pr-10 sm:pr-16 md:pr-24 lg:pr-36 xl:pr-64'>
                            <div className='bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-2 px-4 m-4 rounded-md shadow-md w-fit'>
                                <span className='font-bold'>Answer: </span>
                                <p className='break-all whitespace-pre-line'>{m.content}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </section>

        <section className='bg-slate-100 dark:bg-slate-800 p-10'>
            <form onSubmit={handleSubmit} className='flex items-center'>
                <Input
                    type='text'
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Type your message here...'
                    className='p-4 h-12 break-all whitespace-pre-line'
                />
                <Button type='submit' className='ml-2 w-32 md:w-48 h-12 dark:bg-white'>Send</Button>
            </form>
        </section>
 
    </div>
  );
}