import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="my-8 px-6 text-center sm:my-14 md:my-20">
      <h1 className="mb-8 text-xl font-semibold md:text-2xl lg:text-4xl lg:mb-12">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
