import { useEffect, useState } from "react";
import { useLastNoticeQuery } from "../redux/features/notice/noticeApi";

const NoticePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useLastNoticeQuery(undefined)
    useEffect(() => {
        const isNoticeClosed = sessionStorage.getItem("notice_closed");
        if (!isNoticeClosed) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("notice_closed", "true");
        setIsOpen(false);
    };

    const notices = data?.data

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                    onClick={handleClose}
                >
                    ✖
                </button>
                <h2 className="text-xl font-bold mb-2 text-center">গুরুত্বপূর্ণ বিজ্ঞপ্তি</h2> <hr />
                <p className="text-gray-700 mt-2">
                    {
                        notices?.notice ? notices?.notice : <p>এখন কোন বিজ্ঞপ্তি নেই</p>
                    }
                </p>
            </div>
        </div>
    );
};

export default NoticePopup;
