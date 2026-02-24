const path = require("path")

// Lấy unicode hex của ký tự đầu tiên (thường là chữ Hán)
function getUnicodeSlug(str) {
  if (!str) return ""
  const firstChar = str.trim()[0]
  return firstChar.codePointAt(0).toString(16)
}

module.exports = function (eleventyConfig) {

  // ================================
  // FIX PERMALINK CHO TỪ ĐIỂN HÁN NÔM
  // ================================

  eleventyConfig.addGlobalData("permalink", (data) => {

    // Chỉ áp dụng cho folder notes của Đại Nam
    if (!data.page.inputPath.includes("Đại Nam Quấc âm tự vị - A")) {
      return data.permalink
    }

    const fileName = path.basename(data.page.inputPath, ".md")

    // Lấy chữ đầu tiên (chữ Hán)
    const unicode = getUnicodeSlug(fileName)

    // Tạo slug âm đọc (bỏ dấu tiếng Việt)
    const slug = fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()

    return `/dai-nam-quac-am-tu-vi-a/${slug}-${unicode}/`
  })

  // ================================
  // CẤU HÌNH INPUT / OUTPUT
  // ================================

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    }
  }
}
