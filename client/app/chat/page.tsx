import AIChat from '@/components/chat/Chat';

const Chat = () => {
  return (
    <div className='h-svh w-screen overflow-hidden bg-neutral-900 lg:h-screen'>
      <div className='relative mx-auto h-screen max-w-3xl p-0 text-neutral-300 lg:p-2'>
        <AIChat />
      </div>
    </div>
  );
};

export default Chat;
