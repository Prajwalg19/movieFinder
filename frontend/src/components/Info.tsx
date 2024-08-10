import Typo from '@/Typography';
import {INFO_TEXT} from '@/utils/constants';

export default function Info() {
    return (
        <div className="flex flex-col max-w-5xl mx-auto w-full mt-10 px-4 sm:px-6 lg:px-8" id="info">
            <span className="flex w-full flex-col gap-20">
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex-1 order-2 md:order-1 flex flex-col items-start justify-center mb-6 md:mb-0">
                        <Typo variant='h4' className="font-clashSemiBold mb-4 text-red-700 mt-10 md:mt-0 self-center md:self-start">
                            {INFO_TEXT.PURPOSE_TITLE}
                        </Typo>
                        <Typo variant='body' className="font-medium text-center md:text-start md:text-lg">
                            {INFO_TEXT.PURPOSE_DESCRIPTION}
                        </Typo>
                    </div>
                    <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
                        <img src="/dog.jpeg" alt="image" className="rounded-full h-[300px] w-[300px] object-contain" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex-1 flex justify-center md:justify-start items-center mb-6 md:mb-0">
                        <img src="/popcorn.jpeg" alt="image" className="rounded-full h-[300px] w-[300px] object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-center">
                        <Typo variant='h4' className="font-clashSemiBold mb-4 text-red-700 mt-10 md:mt-0 self-center md:self-start">
                            {INFO_TEXT.FEATURES_TITLE}
                        </Typo>
                        <Typo variant='body' className="font-clashSemiBold text-center md:text-start md:text-lg">
                            {INFO_TEXT.FEATURES_DESCRIPTION}
                            <ul className="list-disc list-inside ml-4 mt-2 text-base md:text-lg font-clashRegular font-medium">
                                {INFO_TEXT.FEATURES_LIST.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </Typo>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex-1 order-2 md:order-1 flex flex-col items-start justify-center mb-6 md:mb-0">
                        <Typo variant='h4' className="font-clashSemiBold mb-4 mt-10 md:mt-0 self-center md:self-start text-red-700">
                            {INFO_TEXT.ABOUT_US_TITLE}
                        </Typo>
                        <Typo variant='body' className="font-medium text-center md:text-start md:text-lg">
                            {INFO_TEXT.ABOUT_US_DESCRIPTION}
                        </Typo>
                    </div>
                    <div className="flex-1 order-1 md:order-2 flex items-center justify-center md:justify-end">
                        <img src="/Banner.jpeg" alt="image" className="rounded-full h-[300px] w-[300px] object-cover" />
                    </div>
                </div>
            </span>
        </div>
    );
}
