import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchTasks } from "../services/tasks-service";
import { formatDate } from "../functions/custom";
import { Link } from "react-router-dom";

function Home({ tasks, loading, error, fetchTasks }) {
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (loading) {
        console.log(`loading: ${loading}`);
    }
    if (error) {
        console.log(`error: ${error}`);
    }
    console.log(tasks);

    return (
        <section>
            <div
                className="md:container md:mx-auto custom--container mt-5 text-white bg-dark rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
                style={{ width: "75%", minHeight: "85vh" }}
            >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-4xl p-5">Your Tasks</h1>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <Link
                            to={'/create'}
                            type="button"
                            class="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                class="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* list */}
                <ul className="h-full overflow-auto p-5 divide-y divide-gray-200 dark:divide0-gray-70 animate-fade-up">
                    {loading ? (
                        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* ... your SVG path here */}
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        tasks &&
                        tasks.map((task) => (
                            <li key={task.id} className="pb-3 sm:pb-4 ">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        {task.status == "PENDING" ? (
                                            <svg
                                                class="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 16 18"
                                            >
                                                <path
                                                    stroke="yellow"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
                                                />
                                            </svg>
                                        ) : task.status == "COMPLETED" ? (
                                            <svg
                                                class="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 16 12"
                                            >
                                                <path
                                                    stroke="green"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M1 5.917 5.724 10.5 15 1.5"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                class="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 14"
                                            >
                                                <path
                                                    stroke="red"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {task.title}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            <span className="font-bold">
                                                {" "}
                                                DUE DATE:{" "}
                                            </span>{" "}
                                            {formatDate(task.due_date)}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <Link to={`/${task.id}`}>
                                            <svg
                                                class="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M1.248 15C.22 11.77 2.275 4.232 9.466 4.232V2.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861V8.539C2.275 9.616 1.248 15 1.248 15Z"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
    loading: state.tasks.loading,
    error: state.tasks.error,
});

export default connect(mapStateToProps, { fetchTasks })(Home);
