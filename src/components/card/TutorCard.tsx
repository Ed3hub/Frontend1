import Image from "next/image"
import Link from "next/link"

interface TutorCardProps {
    imageSrc: string
    name: string
    role: string
    socialLinks?: {
        whatsapp?: string
        facebook?: string
        twitter?: string
    }
}

export const TutorCard = ({
    imageSrc,
    name,
    role,
    socialLinks
}: TutorCardProps) => {
    const nameSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return (
        <Link href={`/tutors/${nameSlug}`} className="block">
        <div className="h-fit w-full rounded-2xl justify-between flex flex-col overflow-hidden shadow-md dark:shadow-white/20">
            <Image
                src={imageSrc}
                alt={name}
                width={1500}
                height={1500}
                className="w-full h-[450px] object-cover"
            />
            <div className="flex flex-col space-y-2 font-poppins h-full p-5">
                <h1 className="text-lg font-semibold">{name}</h1>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-base">{role}</p>
                    <div className="flex space-x-2">
                        {socialLinks?.whatsapp && (
                            <Image src="/icons/whatsapp.svg" alt="whatsapp" width={100} height={100} className="size-5 dark:invert-100" />
                        )}
                        {socialLinks?.facebook && (
                            <Image src="/icons/facebook.svg" alt="facebook" width={100} height={100} className="size-5 dark:invert-100" />
                        )}
                        {socialLinks?.twitter && (
                            <Image src="/icons/twitter.svg" alt="twitter" width={100} height={100} className="size-5 dark:invert-100" />
                        )}
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
} 