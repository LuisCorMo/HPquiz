import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="h-screen pt-36">
      <section>
        <div className="text-white/90 text text-center text-3xl font-semibold font-serif">
          <h1 className="text-2xl font-semibold">Harry Potter</h1>
          <h2 className="text-xl font-semibold">Quiz</h2>
        </div>
        <div className="flex flex-col space-y-4 mt-28 items-center justify-center text-center">
          <Link
            to="/quiz"
            className="text-gray-300 border-2 border-white bg-slate-900 text-lg font-medium rounded-lg py-2 px-4 w-[190px] cursor-pointer"
          >
            Jugar
          </Link>
          <Link
            to="/score"
            className="text-gray-300 border-2 border-white bg-slate-900 text-lg font-medium rounded-lg py-2 px-4 w-[190px] cursor-pointer"
          >
            Puntuaciones
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Home;
