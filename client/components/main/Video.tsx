const Video = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      className='pointer-events-none h-auto lg:w-[600px]'
    >
      <source src='/video.mp4' type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
