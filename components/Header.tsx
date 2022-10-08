import styles from "../styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  
  return (
    <div className={styles.header}>
      <div 
        className={styles.backArrow}
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/icons/return_arrow.svg"
          width={35}
          height={35}
        />
      </div>
      <div className={styles.logoDiv}>
        <Link href="/">
          <Image
            src="/images/wr_logo_v1_light.svg"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>    
  )
}

export default Header;