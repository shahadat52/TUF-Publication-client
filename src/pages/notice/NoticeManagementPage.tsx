import { useState } from 'react';
import AddNoticeModal from './AddNoticeModal';
import { useGetAllNoticesQuery } from '../../redux/features/notice/noticeApi';
import Loading from '../../components/Loading';
import { TNotice } from '../../interface/TNotice';

const NoticeManagementPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { data, isLoading } = useGetAllNoticesQuery(undefined);
    const notices = data?.data;

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="flex items-center">
                <div className="p-4">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Add Notice
                    </button>
                    <AddNoticeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                </div>

            </div>
            <div className="overflow-x-auto grid grid-cols-2 gap-5 mx-5">
                {
                    notices?.length === 0 ? <p className='text-center text-2xl text-red-500 font-semibold'>Products Not Available</p> : notices.map((notice: TNotice) => <div key={notice._id} className='border border-gray-700 p-5 rounded'>{notice.notice}</div>)
                }
            </div>
        </div>
    );
};

export default NoticeManagementPage;