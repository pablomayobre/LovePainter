import { Row, Pagination } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Paginator = ({
  currentPage,
  pages,
  prefix = "/",
}: {
  currentPage: number;
  pages: number;
  prefix?: string;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.page !== `${currentPage}`)
      router.replace(`${prefix}?page=${currentPage}`, undefined, {
        shallow: true,
      });
  }, [currentPage]);

  return (
    <Row justify="center">
      <Pagination
        simple
        hideOnSinglePage
        defaultPageSize={1}
        total={pages}
        current={currentPage}
        onChange={(page: number) => {
          router.push(`${prefix}?page=${page}`);
        }}
      />
    </Row>
  );
};

export default Paginator;
