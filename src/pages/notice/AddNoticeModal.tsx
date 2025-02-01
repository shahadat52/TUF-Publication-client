
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { TNotice } from '../../interface/TNotice';
import { useCreateNoticeMutation } from '../../redux/features/notice/noticeApi';

const AddNoticeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TNotice>();
    const [addNotice] = useCreateNoticeMutation()

    const onSubmit: SubmitHandler<TNotice> = async (data) => {
        setIsLoading(true)
        const noticeData = {
            notice: data.notice
        };

        console.log(noticeData);
        const result = await addNotice(noticeData)
        if (result?.data) {
            setIsLoading(false)
            toast.success("Successfully Added")
            reset();
            onClose();
        }
        if (result?.error) {
            setIsLoading(false)
            toast.error("Failed")
        };
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[50%] ">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-lg font-bold">Add Notice</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                    <div className="">
                        <div>
                            <label className="block text-sm font-medium">Notice</label>

                            <textarea   {...register("notice", { required: "Product name is required" })}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"></textarea>
                            {errors.notice && <p className="text-sm text-red-500">{errors.notice.message}</p>}
                        </div>




                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 border rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        {
                            isLoading ? <Loading /> : <button
                                type="submit"
                                className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Add Product
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNoticeModal;