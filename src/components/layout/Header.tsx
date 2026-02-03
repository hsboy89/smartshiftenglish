import Link from "next/link";
import { Zap } from "lucide-react";
import styles from "./Header.module.css";
import { Button } from "../ui/Button";

export function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    <Zap className={styles.logoIcon} size={28} fill="currentColor" />
                    <span>SmartShift English</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="#generator" className={styles.navLink}>AI 변형문제</Link>
                    <Link href="#voca" className={styles.navLink}>스마트 보카</Link>
                    <Link href="#lms" className={styles.navLink}>학원 관리(LMS)</Link>
                    <Link href="#pricing" className={styles.navLink}>도입 문의</Link>
                </nav>

                <div className={styles.actions}>
                    <Button variant="ghost" size="sm">원장님 전용관</Button>
                    <Button size="sm">프리미엄 무료 체험</Button>
                </div>
            </div>
        </header>
    );
}
