const ContentCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default ContentCenter;
