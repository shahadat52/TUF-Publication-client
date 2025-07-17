import { useState } from 'react';
import AddNoticeModal from './AddNoticeModal';
import { useDeleteNoticeMutation, useGetAllNoticesQuery } from '../../redux/features/notice/noticeApi';
import Loading from '../../components/Loading';
import { TNotice } from '../../interface/TNotice';
import { toast } from 'react-toastify';

const NoticeManagementPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { data, isLoading } = useGetAllNoticesQuery(undefined);
    const notices = data?.data;
    const [deleteNotice] = useDeleteNoticeMutation()

    if (isLoading) {
        return <Loading />
    }


    const handleDelete = async (id: string) => {
        alert("Action Confirmed!");
        const result = await deleteNotice(id)
        if (result?.data) {
            toast.success("Successfully Deleted")
        }
        if (result?.error) {
            toast.error("Failed")
        };

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
                    notices?.length === 0 ? <p className='text-center text-2xl text-red-500 font-semibold'>There is no notice</p> : notices.map((notice: TNotice) =>
                        <div key={notice._id} className='border border-gray-700 p-5 rounded'>
                            <p>{notice.notice}</p>
                            <button onClick={() => handleDelete(notice._id)} className='btn btn-error mb-1'>Delete</button>

                        </div>)
                }
            </div>
        </div>
    );
};

export default NoticeManagementPage;