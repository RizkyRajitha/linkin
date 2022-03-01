import { useEffect } from "react";

export default function Links({ linkData, linkPadding }) {
  useEffect(() => {
    console.log(linkData);
  }, [linkData]);
  return (
    <div className="links">
      <ul>
        {linkData.map((link, id) => {
          return (
            <li key={id}>
              <a
                href={`${link.linkUrl || "#"}`}
                className="link"
                target="_blank"
                style={{
                  backgroundColor: link.bgColor || "#2c6bed",
                  color: link.textColor || "#ffffff",
                  borderRadius: `${link.borderRadius || "4"}px`,
                }}
              >
                {link.iconClass && <i className={`${link.iconClass} icon`}></i>}
                <div className="d-flex w-100 align-items-center justify-content-center">
                  {link.displayText}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          .links ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .links ul li {
            margin: 14px 0;
          }
          .link {
            padding: ${linkPadding};
            display: flex;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            color: #fff;
            align-items: center;
          }
          .link:hover {
            opacity: 0.9;
          }
          .icon {
            // padding: 1rem;
            font-size: 1.7rem;
          }
        `}
      </style>
    </div>
  );
}
