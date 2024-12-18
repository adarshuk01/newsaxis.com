export default function Hero() {
    return (
      <div className="max-w-7xl mx-auto min-h-[300px] w-full bg-slate-100 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-2 animate-fade-in">
          <h2 className="text-sm tracking-[0.2em] text-gray-600 animate-slide-in">
            WELCOME TO NEWSAXIS
          </h2>
          <h1 className="text-2xl md:text-2xl lg:text-4xl font-medium leading-tight md:leading-tight lg:leading-tight animate-slide-in">
            Craft narratives{" "}
            <span role="img" aria-label="writing hand">
              ✍️
            </span>{" "}
            that ignite{" "}
            <span className="text-red-600">
              inspiration{" "}
              <span role="img" aria-label="light bulb">
                💡
              </span>
            </span>
            ,{" "}
            <span className="text-red-600">
              knowledge{" "}
              <span role="img" aria-label="book">
                📕
              </span>
            </span>
            , and{" "}
            <span className="text-red-600">
              entertainment{" "}
              <span role="img" aria-label="cinema">
                🎬
              </span>
            </span>
          </h1>
        </div>
      </div>
    );
  }
  