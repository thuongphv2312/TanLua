export interface ProductSpec {
  key: string;
  value: string;
}

export const parseProductSpecs = (product: any): ProductSpec[] => {
  const specs: ProductSpec[] = [];
  if (!product) return specs;

  const name = product.name || product.title || "";
  const desc = product.description || "";
  const textToSearch = `${name} ${desc}`;

  // 1. Thương hiệu
  let brand = "Tấn Lụa";
  if (product.author && product.author !== "Tấn Lụa" && product.author !== "Admin" && product.author !== "Tấn Lụa Admin") {
     brand = product.author;
  } else if (name.toUpperCase().includes("TJ35")) {
     brand = "TOJIKO";
  } else {
     const brands = ["HUKAN", "OSHIMA", "GREEKMAN", "MITSUKAISHO", "NAKAWA", "TALU", "HANKOCK", "ROMANO", "ANOVI", "TOJIKO", "DRAGON", "TAL", "CALI", "MULINSEN", "KMX"];
     for (const b of brands) {
        if (name.toUpperCase().includes(b)) {
           brand = b;
           break;
        }
     }
  }
  specs.push({ key: "Thương hiệu", value: brand });

  // 2. Công suất
  const wattMatch = textToSearch.match(/(\d+)\s*(W|kW|watt)/i);
  if (wattMatch) {
    specs.push({ key: "Công suất", value: wattMatch[0] });
  } else {
    const hpMatch = textToSearch.match(/(\d+(\.\d+)?)\s*HP/i);
    if (hpMatch) specs.push({ key: "Công suất động cơ", value: hpMatch[0] });
  }

  // Điện áp
  const voltMatch = textToSearch.match(/(\d+)\s*(V|Volt)/i);
  if (voltMatch) {
    specs.push({ key: "Điện áp định mức", value: voltMatch[0] });
  }

  // Tốc độ
  const rpmMatch = textToSearch.match(/(\d+)\s*(RPM|vòng\/phút|v\/phút|r\/phút)/i);
  if (rpmMatch) {
    specs.push({ key: "Tốc độ không tải", value: rpmMatch[0] });
  }

  // 3. Loại piston / Ty (cho đầu xịt, máy rửa xe)
  if (textToSearch.toLowerCase().includes("ty sứ")) {
    specs.push({ key: "Loại piston (Ty)", value: "Ty sứ (Độ bền cao)" });
  } else if (textToSearch.toLowerCase().includes("ty inox")) {
    specs.push({ key: "Loại piston (Ty)", value: "Ty inox tiêu chuẩn" });
  }

  const cylinderMatch = textToSearch.match(/xilanh\s*(\d+)\s*mm/i);
  if (cylinderMatch) {
    specs.push({ key: "Đường kính xilanh", value: cylinderMatch[1] ? `${cylinderMatch[1]} mm` : cylinderMatch[0] });
  }

  // 4. Kích thước / Chiều dài dây
  const lenMatch = textToSearch.match(/(\d+)\s*M/i);
  if (lenMatch && !textToSearch.toUpperCase().includes("MM") && !textToSearch.toLowerCase().includes("l/min")) {
    specs.push({ key: "Chiều dài dây dẫn", value: lenMatch[0] });
  }

  // 5. Dung tích / Lưu lượng
  const capacityMatch = textToSearch.match(/(\d+)\s*(L|Lít)/i);
  if (capacityMatch) {
    specs.push({ key: "Dung tích bình chứa", value: capacityMatch[0] });
  }

  const flowMatch = textToSearch.match(/(\d+)\s*L\/phút/i);
  if (flowMatch) {
    specs.push({ key: "Lưu lượng nước tối đa", value: flowMatch[0] });
  }

  // 6. Áp lực
  const barMatch = textToSearch.match(/(\d+)\s*BAR/i);
  if (barMatch) {
    specs.push({ key: "Áp lực làm việc", value: barMatch[0] });
  }

  // 7. Trọng lượng
  const weightMatch = textToSearch.match(/(\d+(\.\d+)?)\s*KG/i);
  if (weightMatch) {
    specs.push({ key: "Trọng lượng máy", value: weightMatch[0] });
  }

  // 8. Tình trạng & Bảo hành
  specs.push({ key: "Chế độ bảo hành", value: "12 tháng chính hãng" });
  specs.push({ key: "Trạng thái kho", value: product.isSoldOut ? "Tạm hết hàng" : "Sẵn hàng tại kho" });

  return specs;
};
