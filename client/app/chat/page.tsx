import AIChat from '@/components/chat/Chat';

const Chat = () => {
  return (
    <div className='h-screen w-screen bg-neutral-900'>
      <div className='relative mx-auto h-screen p-0 text-neutral-300 lg:p-2'>
        <AIChat />
      </div>
    </div>
  );
};

export default Chat;
