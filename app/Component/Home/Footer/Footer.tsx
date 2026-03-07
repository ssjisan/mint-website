import "./Footer.scss"
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="container footer-container" >
      {/* Left Side */}
      <p className="label">
        © {currentYear}.  A Brand of{" "}<a
          href="https://antbd.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 500, color: "#FFFFFF" }}
        >
          Antaranga Dotcom Limited
        </a>
      </p>

      {/* Powered By */}
      <p className="label">
        🔥 Powered By{" "}
        <a
          href="https://codesenate.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 500, color: "#FFFFFF" }}
        >
          CodeSenate
        </a>
      </p>
    </div>
  );
}