import React from 'react';
import { Layout, Typography } from 'antd';
import { HOTLINE, ADDRESS, RECRUITMENT_EMAIL } from '../NewsPage/constants';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const CareersPage: React.FC = () => {
    // Lấy ngày cuối cùng của năm hiện tại (31/12/YYYY)
    const getEndOfYear = () => {
        const currentYear = new Date().getFullYear();
        return `31/12/${currentYear}`;
    };

    const jobData = {
        title: 'TUYỂN DỤNG NHÂN VIÊN NỘI DUNG (CONTENT EDITOR)',
        company: 'Tấn Lụa',
        website: 'TanLua.com.vn',
        description: `Công ty Cổ phần OSHIMA VIỆT NAM là một trong những thương hiệu hàng đầu tại Việt Nam trong lĩnh vực phân phối các sản phẩm máy móc thiết bị công nghiệp, nông nghiệp và dụng cụ cầm tay chuyên dụng. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là đối tác tin cậy của hàng ngàn khách hàng trên toàn quốc.

Để đáp ứng nhu cầu phát triển ngày càng cao của công ty, chúng tôi đang tìm kiếm những ứng viên tài năng, nhiệt huyết để gia nhập đội ngũ của mình.`,
        responsibilities: [
            'Biên tập nội dung website, fanpage và các kênh truyền thông của công ty',
            'Tìm kiếm và cập nhật thông tin sản phẩm, dịch vụ',
            'Viết bài PR, quảng cáo sản phẩm',
            'Đăng bài và tương tác với khách hàng trên các nền tảng mạng xã hội',
            'Hỗ trợ các hoạt động marketing và truyền thông khác theo yêu cầu',
        ],
        requirements: [
            'Tốt nghiệp Cao đẳng, Đại học chuyên ngành Báo chí, Marketing, Ngôn ngữ Anh hoặc các ngành liên quan',
            'Có kinh nghiệm từ 1-2 năm ở vị trí tương đương (ưu tiên)',
            'Kỹ năng viết bài tốt, sáng tạo, có khả năng tư duy logic',
            'Có kiến thức về SEO, marketing online',
            'Sử dụng thành thạo các công cụ soạn thảo văn bản, Photoshop, AI và các công cụ thiết kế cơ bản',
            'Chăm chỉ, cẩn thận, có tinh thần trách nhiệm cao',
            'Có khả năng làm việc độc lập và làm việc nhóm tốt',
            'Ưu tiên ứng viên có kinh nghiệm trong lĩnh vực máy móc công nghiệp, nông nghiệp hoặc các lĩnh vực kỹ thuật liên quan',
        ],
        benefits: [
            'Mức lương: Thỏa thuận theo năng lực (cạnh tranh)',
            'Thưởng theo hiệu quả công việc và doanh thu công ty',
            'Tăng lương định kỳ hàng năm',
            'Làm việc trong môi trường chuyên nghiệp, năng động, có cơ hội thăng tiến',
            'Được đào tạo và phát triển kỹ năng nghề nghiệp',
            'Hưởng đầy đủ các chế độ BHXH, BHYT, BHTN theo quy định',
            'Nghỉ phép, lễ tết theo quy định của pháp luật',
            'Tham gia các hoạt động teambuilding, du lịch hàng năm',
        ],
        contact: {
            deadline: getEndOfYear(),
            address: ADDRESS,
            phone: HOTLINE,
            email: RECRUITMENT_EMAIL,
        },
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <Content style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ marginBottom: '30px' }}>
                    {/* <Title level={1} style={{ color: '#333', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
                        THÔNG TIN TUYỂN DỤNG
                    </Title> */}

                    <img
                        src="https://i.ibb.co/QFggnZtH/BANNER-TUYEN-DUNG.png"
                        alt="Banner Tuyển Dụng"
                        style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <Title level={2} style={{ color: '#ff6600', margin: 0, fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                {jobData.title}
                            </Title>
                            <div>
                                <span style={{
                                    backgroundColor: '#ff6600',
                                    color: '#fff',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    marginRight: '8px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {jobData.company}
                                </span>
                                <Text style={{ fontSize: '14px', color: '#666' }}>{jobData.website}</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <Paragraph style={{ fontSize: '14px', lineHeight: '1.8', color: '#333', textAlign: 'justify', marginBottom: '15px' }}>
                        {jobData.description}
                    </Paragraph>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <Title level={4} style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                        Nhiệm vụ chính:
                    </Title>
                    <ul style={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#333',
                        paddingLeft: '20px',
                        margin: 0
                    }}>
                        {jobData.responsibilities.map((item, index) => (
                            <li key={index} style={{ marginBottom: '6px' }}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <Title level={4} style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                        Yêu cầu ứng viên:
                    </Title>
                    <ul style={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#333',
                        paddingLeft: '20px',
                        margin: 0
                    }}>
                        {jobData.requirements.map((item, index) => (
                            <li key={index} style={{ marginBottom: '6px' }}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <Title level={4} style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                        Quyền lợi được hưởng:
                    </Title>
                    <ul style={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#333',
                        paddingLeft: '20px',
                        margin: 0
                    }}>
                        {jobData.benefits.map((item, index) => (
                            <li key={index} style={{ marginBottom: '6px' }}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div style={{
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <Title level={4} style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                        Hồ sơ ứng tuyển:
                    </Title>

                    <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#333' }}>
                        <p style={{ marginBottom: '8px' }}>
                            <strong>Thời hạn nhận hồ sơ đến ngày:</strong>{' '}
                            <span style={{ color: '#ff6600', fontWeight: 'bold' }}>{jobData.contact.deadline}</span>
                        </p>

                        <p style={{ marginBottom: '8px' }}>
                            <strong>Hồ sơ gửi về (bản mềm hoặc bản cứng):</strong> {jobData.contact.email}
                        </p>

                        <p style={{ marginBottom: '8px' }}>
                            <strong>Địa chỉ:</strong> {jobData.contact.address}
                        </p>

                        <p style={{ marginBottom: '8px' }}>
                            <strong>Điện thoại:</strong> {jobData.contact.phone}
                        </p>

                        <p style={{ marginBottom: '0' }}>
                            <strong>Email:</strong> {jobData.contact.email}
                        </p>
                    </div>
                </div>

                <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                    <p>Nếu bạn quan tâm đến vị trí này, vui lòng gửi CV của bạn về email: <strong>{jobData.contact.email}</strong></p>
                    <p>Hoặc liên hệ trực tiếp qua hotline: <strong>{jobData.contact.phone}</strong></p>
                </div>
            </Content>
        </Layout>
    );
};

export default CareersPage;
