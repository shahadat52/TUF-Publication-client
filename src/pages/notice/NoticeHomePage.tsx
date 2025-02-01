import Loading from "../../components/Loading";
import { TNotice } from "../../interface/TNotice";
import { useGetAllNoticesQuery } from "../../redux/features/notice/noticeApi";

const NoticeHomePage = () => {
    const { data, isLoading } = useGetAllNoticesQuery(undefined);
    const notices = data?.data;


    if (isLoading) {
        return <Loading />
    }


    return (
        <div>
            <div className="overflow-x-auto grid grid-cols-2 gap-5 mx-5 mt-5">
                {
                    notices?.length === 0 ? <p className='text-center text-2xl text-red-500 font-semibold'>There is no notice</p> : notices?.map((notice: TNotice) =>
                        <div key={notice._id} className='border border-gray-700 p-5 rounded'>
                            <p>তারিখ: {new Date(notice.createdAt).toISOString().split("T")[0]}</p>
                            <p>{notice.notice}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default NoticeHomePage;