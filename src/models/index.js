import { HTTP } from "../utils/http";

class IndexModel extends HTTP {
    getNewsList(field, count) {
        return new Promise((resolve, rejectt) => {
            this.ajax({
                url: "Juhe/getNewsList",
                type: "POST",
                dataType: "JSON",
                data: {
                    field: field,
                },
                success(res) {
                    const {
                        error_code,
                        result: { data },
                    } = res;
                    let dataArr = [],
                        index = 0;
                    if (error_code == 0) {
                        while (index <= data.length - 1) {
                            dataArr.push(data.slice(index, (index += count)));
                        }
                    }
                    resolve(dataArr);
                },
                error(err) {
                    resolve(err);
                },
            });
        });
    }
}

export default new IndexModel();