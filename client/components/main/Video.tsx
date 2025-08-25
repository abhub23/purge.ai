const Video = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      className='pointer-events-none h-auto w-[320px] rounded-md lg:w-[800px]'
    >
      <source src='/PurgeAI.mp4' type='video/mp4' />
    </video>
  );
};

export default Video;
