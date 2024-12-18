// NewsHeader.js
export default function NewsHeader({heading,link}) {
    return (
      <div className="flex justify-between items-center mb-2 animate-slide-in">
        <h2 className="text-lg font-semibold">{heading}</h2>
        <a href={`${link}`} className="text-red-500 hover:text-red-600 flex items-center ">
          See all 
          <span className="ml-1">
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          </span>
        </a>
      </div>
    );
  }