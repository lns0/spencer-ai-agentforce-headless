export default async function ChatLoadingPage() {
  return (
    <div className="flex flex-col items-center justify-items-center h-screen p-0 gap-0 ">
      <div className="flex-1 overflow-scroll w-full justify-items-center">
        <div className="h-[56px] w-full"></div>
        <div className="flex flex-col gap-4 px-2 w-full md:w-4/5 lg:w-3/5 xl:w-5/8">
          <div className="flex items-center gap-3 pl-5 pr-20 pb-0">
            <div className="animate-pulse w-7 h-7 bg-gray-200 rounded-full mt-1"></div>
            <div className="animate-pulse w-2/5 h-8 bg-gray-200 rounded-lg mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
