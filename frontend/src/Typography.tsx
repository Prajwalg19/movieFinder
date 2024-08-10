import classnames from "classnames";
const tagMapping = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "span",
    body: "span",
    "body-small": "span",
} as const

type TagTypes = {
    children: React.ReactNode;
    variant: keyof typeof tagMapping;
    className?: string;
}


const allTags = {
    h1: "text-4xl sm:text-5xl 2xl:text-6xl font-clashBold",
    h2: "text-3xl sm:text-4xl lg:text-5xl",
    h3: "text-3xl md:text-4xl",
    h4: "text-2xl md:text-3xl",
    h5: "text-xl sm:text-2xl",
    h6: "text-lg sm:text-xl font-clashSemiBold tracking-wide [word-spacing:2.5px]",
    p: "text-base md:text-lg font-clashRegular font-semibold tracking-wide [word-spacing:2.5px]",
    body: "font-clashRegular font-medium tracking-wide text-base [word-spacing:2.5px]",
    "body-small": "text-xs md:text-sm tracking-wide"
} as const

export default function Typo({children, variant, className, ...rest}: TagTypes) {

    const Tag = tagMapping[variant];
    const typography = allTags[variant];
    return (
        <Tag className={classnames(typography, className)} {...rest}>{children}</Tag>
    )

}
