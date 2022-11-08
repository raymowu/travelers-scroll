import classes from "../../css/navbar.module.css";
import "../../css/navbar.css";

function Header({ user }) {
  return (
    <header>
      <a href="/">
        <img
          className="travelerscroll-logo"
          height="70px"
          src="https://i.imgur.com/IWLHwmq.png"
          alt="travelerscroll logo"
        ></img>
      </a>
      <div>
        <ul className={`${classes.items}`}>
          {user.id ? (
            <>
              <li>
                <a href={`/profile/${user.username}`}>{user.username}</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className={classes.link}>
                  Log In
                </a>
              </li>
              <li>
                <a href="/register" className={classes.signup}>
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
