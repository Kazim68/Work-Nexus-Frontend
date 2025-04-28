import React, { useState } from "react";
import { FaRegClock, FaEdit } from "react-icons/fa";
import { createWithAuth, update } from "../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCompanyTimings } from "../../Redux/UserSlice";

// Modal Component
const Modal = ({ isOpen, onClose, time, onTimeChange, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Time</h2>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="border border-gray-300 rounded w-full p-2 mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

const ClockCard = ({ time, label, onEditClick }) => {
    return (
        <div className="relative text-white rounded-md p-4 border border-[#F99932] w-[200px] h-[100px]">
            {/* Edit Icon */}
            <div
                className="absolute top-2 right-2 border border-gray-500 rounded p-1 cursor-pointer hover:text-orange-500"
                onClick={onEditClick}
            >
                <FaEdit size={12} />
            </div>

            {/* Clock Icon */}
            <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <FaRegClock className="text-gray-700 text-lg" />
                </div>
                <div>
                    <p className="text-orange-500 font-semibold text-[14px]">{time}</p>
                    <p className="text-sm text-white">{label}</p>
                </div>
            </div>
        </div>
    );
};

const ClockCards = ({ times: initialTimes }) => {
    const [times, setTimes] = useState(initialTimes); // ✅ Store times in state
    const [modalOpen, setModalOpen] = useState(false);
    const [currentLabel, setCurrentLabel] = useState("");
    const [newTime, setNewTime] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { data } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const companyId = data.employee.companyID._id


    const handleEditSubmit = async () => {
        try {

            const updatedTimes = [...times];
            updatedTimes[selectedIndex] = newTime; // Update local array
            setTimes(updatedTimes); // Update UI optimistically

            // ✅ Now send both clockIn and clockOut in API
            const payload = {
                clockIn: updatedTimes[0],
                clockOut: updatedTimes[1],
            };

            const workTimings = [`${payload.clockIn} - ${payload.clockOut}`]


            await update("/company/updateTime", companyId, {workTimings : workTimings}, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });

            dispatch(updateCompanyTimings(workTimings));

            toast.success("Company Timings Updated!");
            setModalOpen(false);

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const openEditModal = (label, index) => {
        setCurrentLabel(label);
        setSelectedIndex(index);
        setNewTime(times[index]);
        setModalOpen(true);
    };

    return (
        <div>
            <div className="flex gap-4">
                <ClockCard
                    time={times[0]}
                    label="Clock In"
                    onEditClick={() => openEditModal("Clock In", 0)}
                />
                <ClockCard
                    time={times[1]}
                    label="Clock Out"
                    onEditClick={() => openEditModal("Clock Out", 1)}
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                time={newTime}
                onTimeChange={setNewTime}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
};

export default ClockCards;
