import Link from "next/link";

export function HomeChoices() {
  return (
    <section className="home-choices" aria-label="Choose how to start">
      <div className="wrap">
        <div className="home-choices-row">
          <div className="home-choice home-choice-curated">
            <h2>Shop a curated setup</h2>
            <p>Find a combo you like and shop the gear.</p>
            <a className="choice-button choice-primary" href="#builds">
              Browse Bag Combos
              <ArrowDown />
            </a>
          </div>
          <p className="home-choices-or">OR</p>
          <div className="home-choice home-choice-own">
            <Link className="choice-button choice-outline" href="/build">
              Build My Bag
              <ArrowUp />
            </Link>
            <h2>Preview your own setup</h2>
            <p>Upload an Amazon cart screenshot to see your bag and headcovers together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.5 V19.5 M6 13.5 L12 19.5 L18 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 19.5 V4.5 M6 10.5 L12 4.5 L18 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
