import { Todo } from "@/components/TodoList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const { id } = useParams();

  const { data, isPending, error } = useQuery<Todo>({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/todos/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch a detail todo ${id}`);
      }
      return await response.json();
    },
  });

  if (isPending) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Link style={{ backgroundColor: "lightblue" }} href="/todolist">
        전체리스트 화면으로 이동
      </Link>
      <h2>상세페이지</h2>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
}
