import { Fragment } from "react";

const Home = () => {
  const greeting = sessionStorage.getItem('userName')
  const formatGreeting = (name) => {
    if (!name) return ''; // Return an empty string if name is null or undefined
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Fragment>
      <div className="p-5 mb-4 jumbotron-bg">
        <div id="jumbo" className="container-fluid py-5">
          <h1 id="jumbo" className="font-bold text-4xl">
            Hello {formatGreeting(greeting)}!
          </h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
