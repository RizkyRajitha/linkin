const SocialIconsSection = ({ socialData }) => {
  return (
    <div>
      <div className="social">
        <ul>
          {socialData.map((link, id) => {
            return (
              <li key={id}>
                <a
                  href={`${link.linkUrl || "#"}`}
                  className="social_icon"
                  target="_blank"
                  style={{
                    backgroundColor: link.bgColor || "#2c6bed",
                    color: link.textColor || "#ffffff",
                    borderRadius: `${link.borderRadius || "4"}px`,
                  }}
                >
                  {link.iconClass && (
                    <i className={`${link.iconClass} single_icon fa-fw`}></i>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <style
        jsx
        onError={(e) => {
          console.log(e);
        }}
      >
        {`
          .single_icon {
            font-size: 2rem;
          }

          .social {
            // margin: 0 -2rem 0 -2rem;
          }
          .social ul {
            list-style: none;
            padding: 0;
            margin: 0 auto;
            width: fit-content;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }

          .social ul li {
            margin: 7px;
          }

          .social_icon {
            display: inline-flex;
            padding: 0.5rem;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            transition: ease all 0.3s;
            color: #fff;
            align-items: center;
          }

          .social_icon:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
};

export default SocialIconsSection;
