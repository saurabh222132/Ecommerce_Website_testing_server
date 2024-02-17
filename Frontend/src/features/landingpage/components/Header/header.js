import "bootstrap/dist/css/bootstrap.min.css";

export const Header = () => {
  return (
    <header className=" text-dark bg-slate-200  py-5 ">
      <div className="container text-center">
        <h1 className="display-4 text-xlg font-bold ">
          Welcome to Shopping Hub
        </h1>
        <p className="lead">Discover amazing products for every occasion!</p>
        <p>Explore our collection and find your favorites.</p>
      </div>
    </header>
  );
};
