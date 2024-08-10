import {Accordion} from "flowbite-react";
import {FAQ_CONTENT} from "@/utils/constants";
import Typo from "@/Typography";

export default function FAQ() {
    return (
        <div className="max-w-5xl font-clashSemiBold w-full mx-auto px-4 sm:px-6 lg:px-8 mt-10" id="faq">
            <Typo variant="h3" className="font-clashSemiBold mb-10 text-center">FAQ</Typo>
            <Accordion>
                {
                    FAQ_CONTENT.map((item, index) => (
                        <Accordion.Panel key={index}>
                            <Accordion.Title>{item.QUESTION}</Accordion.Title>
                            <Accordion.Content>
                                <Typo variant="p" className="mb-2 text-gray-500 dark:text-gray-400">{item.ANSWER}</Typo>
                            </Accordion.Content>
                        </Accordion.Panel>

                    ))
                }
            </Accordion>
        </div>
    );
}
