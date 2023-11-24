import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GiProfit } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Legend,
} from "recharts";

const AdminHome = () => {
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: analyticsData = [], isLoading } = useQuery({
        queryKey: ["analytics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            console.log(res);
            return res.data;
        },
    });

    const { data: orderAnlyticsData = [], isLoading: orderAnlyticsLoading } =
        useQuery({
            queryKey: ["orderAnalytics"],
            queryFn: async () => {
                const res = await axiosSecure.get("/order-stats");
                return res.data;
            },
        });

    if (isLoading || orderAnlyticsLoading) return <div>Loading...</div>;

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${
            x + width / 2
        },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
            y + height
        } ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return (
            <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
        );
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = orderAnlyticsData.map((item) => {
        return { name: item.category, value: item.totalSales };
    });
    return (
        <div className="p-10 space-y-10">
            <h2 className="text-3xl">
                <span>
                    Hi, Welcome
                    {user?.displayName ? `, ${user.displayName}` : "Back"}
                </span>
            </h2>
            <div className="flex justify-center">
                <div className="stats shadow">
                    <div className="stat bg-gradient-to-r from-lime-400 to-lime-50">
                        <div className="stat-figure text-secondary">
                            <GiProfit size={40} />
                        </div>
                        <div className="stat-title">Revenue</div>
                        <div className="stat-value">
                            ${analyticsData.revenue / 100}
                        </div>
                    </div>

                    <div className="stat bg-gradient-to-r from-amber-300 to-amber-50">
                        <div className="stat-figure text-secondary">
                            <FaUserFriends size={40} />
                        </div>
                        <div className="stat-title">Users</div>
                        <div className="stat-value">
                            {analyticsData.totalUsers}
                        </div>
                    </div>

                    <div className="stat bg-gradient-to-r from-purple-400 to-purple-100">
                        <div className="stat-figure text-secondary">
                            <MdOutlineFoodBank size={40} />
                        </div>
                        <div className="stat-title">Products</div>
                        <div className="stat-value">
                            {analyticsData.totalProducts}
                        </div>
                    </div>

                    <div className="stat bg-gradient-to-r from-blue-500 to-blue-100">
                        <div className="stat-figure text-secondary">
                            <MdShoppingCartCheckout size={40} />
                        </div>
                        <div className="stat-title">Orders</div>
                        <div className="stat-value">
                            {analyticsData.totalOrders}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-1/2 flex justify-center">
                    <BarChart
                        width={500}
                        height={300}
                        data={orderAnlyticsData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar
                            dataKey="count"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {orderAnlyticsData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % 20]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2 flex justify-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={160}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
