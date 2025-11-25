import React from "react";

const Relatedblogs = () => {
  return (
    <div className="py-10 w-full bg-[#f7edee]">
      <div className="Mycontainer bg-white rounded-lg shadow-sm">
        <div>
          <h1 className="py-8 px-8 text-2xl font-bold">Related Posts</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-8 gap-6">
            {/* Card 1 */}
            <div>
              <img
                className="w-full h-auto rounded-md"
                src="bloge-3.jpg"
                alt="relatedblog"
              />
              <h1 className="pt-3 pb-2 text-lg font-bold">
                How to Style One Jacket Three Ways
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                <span>May 15, 2025</span>
                <span>/</span>
                <span>by hqueen</span>
              </div>
            </div>

            {/* Card 2 */}
            <div>
              <img
                className="w-full h-auto rounded-md"
                src="bloge-3.jpg"
                alt="relatedblog"
              />
              <h1 className="pt-3 pb-2 text-lg font-bold">
                How to Style One Jacket Three Ways
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                <span>May 15, 2025</span>
                <span>/</span>
                <span>by hqueen</span>
              </div>
            </div>

            {/* Card 3 */}
            <div>
              <img
                className="w-full h-auto rounded-md"
                src="bloge-3.jpg"
                alt="relatedblog"
              />
              <h1 className="pt-3 pb-2 text-lg font-bold">
                How to Style One Jacket Three Ways
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                <span>May 15, 2025</span>
                <span>/</span>
                <span>by hqueen</span>
              </div>
            </div>

            {/* Card 4 */}
            <div>
              <img
                className="w-full h-auto rounded-md"
                src="bloge-3.jpg"
                alt="relatedblog"
              />
              <h1 className="pt-3 pb-2 text-lg font-bold">
                How to Style One Jacket Three Ways
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                <span>May 15, 2025</span>
                <span>/</span>
                <span>by hqueen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="Mycontainer bg-white px-5 py-8">
          {/* <!-- Title --> */}
          <h1 className="text-2xl font-bold mb-2">Leave a Comment</h1>

          {/* <!-- Subtitle --> */}
          <p className="text-gray-600 mb-6">
            Your email address will not be published. Required fields are marked
            *
          </p>

          {/* <!-- Comment Box --> */}
          <textarea
            className="w-full h-40 border border-gray-400 hover:border-gray-200 p-4 rounded-md focus:outline-none mb-6"
            placeholder="Type here.."
          ></textarea>

          {/* <!-- Name / Email / Website --> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              className="border border-gray-400 hover:border-gray-200 p-3 rounded-md focus:outline-none"
              placeholder="Name*"
            />
            <input
              type="email"
              className="border border-gray-400 hover:border-gray-200 p-3 rounded-md focus:outline-none"
              placeholder="Email*"
            />
            <input
              type="text"
              className="border border-gray-400 hover:border-gray-200 p-3 rounded-md focus:outline-none"
              placeholder="Website"
            />
          </div>
          {/* 
    <!-- Checkbox --> */}
          <div className="flex items-center gap-2 mb-6 ">
            <input
              type="checkbox"
              className="w-4 h-4 accent-purple-600 cursor-pointer"
            />
            <p className="text-gray-700 text-sm">
              Save my name, email, and website in this browser for the next time
              I comment.
            </p>
          </div>

          {/* <!-- Button --> */}
          <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold">
            POST COMMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Relatedblogs;
