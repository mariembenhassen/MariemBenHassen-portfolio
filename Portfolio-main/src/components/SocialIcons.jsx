import { motion } from "framer-motion";

const SocialIcons = () => {
  const styles = {
    socialIcons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed", // Use fixed to keep it at the bottom across all scroll positions
      left: "0",
      right: "0",
      bottom: "0",
      width: "100%", // Ensure it spans the full width
    },
    icon: {
      textDecoration: "none",
      fontSize: "22px",
      padding: "10px",
      transition: "0.2s ease-in",
    },
  };

  const openLinkInNewWindow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="socialIcons" style={styles.socialIcons}>
      <div
        className="icon"
        style={styles.icon}
        onClick={() => openLinkInNewWindow("https://github.com/mariembenhassen")}
      >
        <motion.i
          // initial={{ x: 100, y: 0, opacity: 0 }}
          // animate={{ x: 100, y: 0, opacity: 1 }}
          // transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
          className="fa-brands fa-github"
          aria-hidden="true"
          title="Ben Hassen Mariem' GitHub Profile"
        ></motion.i>
      </div>
      <div
        className="icon"
        style={styles.icon}
        onClick={() =>
          openLinkInNewWindow(
            "https://www.linkedin.com/in/mariem-ben-hassen-8bb5ab2a4/"
          )
        }
      >
        <motion.i
          initial={{ y1: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.5, type: "spring" }}
          className="fa-brands fa-linkedin"
          aria-hidden="true"
          title="Ben Hassen Mariem' LinkedIn Profile"
        ></motion.i>
      </div>
      <div
        className="icon"
        style={styles.icon}
        onClick={() =>
          openLinkInNewWindow("https://www.instagram.com/mariem.b.h/")
        }
      >
        <motion.i
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
          className="fa-brands fa-instagram"
          aria-hidden="true"
          title="Ben Hassen Mariem' Instagram Profile"
        ></motion.i>
      </div>
    </div>
  );
};

export default SocialIcons;
