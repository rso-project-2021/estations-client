import { useRouter } from "next/router";

const station = () => {

    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Station { id }</h1>
        </div>
    );
}

export default station;
