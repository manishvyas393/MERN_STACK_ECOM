class features {
      constructor(query, queryStr) {
            this.query = query;
            this.queryStr = queryStr
      }
      search() {
            const keyword = this.queryStr.keyword ? {
                  name: {
                        $regex: this.queryStr.keyword,
                        $options: "i",
                  }
            } : {}
            console.log(keyword)
            this.query = this.query.find({ ...keyword })
            return this
      }
      filter() {
            const queryCopy = { ...this.queryStr }
            const removeField = ["keyword", "page", "limit"]
            removeField.forEach(key => delete queryCopy[key])
            //filter for price and rating
            let queryStr = JSON.stringify(queryCopy)
            console.log(queryStr)
            const regex = /\b(gt|gte|lt|lte|in)\b/g;
            queryStr = queryStr.replace(regex, '$$' + "$1");
            this.query = this.query.find(JSON.parse(queryStr))
            return this
      }
      pagination(resultPerPage) {
            const currentPage = Number(this.queryStr.page) || 1;
            const skip = resultPerPage * (currentPage - 1);
            this.query = this.query.limit(resultPerPage).skip(skip);
            return this;
      }
}

module.exports = features