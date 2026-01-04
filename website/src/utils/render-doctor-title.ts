const hospitalMap: Record<string, string> = {
  director: 'Giám đốc Bệnh viện',
  deputy_director: 'Phó Giám đốc Bệnh viện',
  doctor: 'Bác sĩ điều trị',
};

const instituteMap: Record<string, string> = {
  director: 'Giám đốc',
  deputy_director: 'Phó Giám đốc',
  center_director: 'Giám đốc',
  deputy_center_director: 'Phó Giám đốc',
  head_of_institute: 'Viện trưởng',
  deputy_head_of_institute: 'Phó viện trưởng',
};

const departmentMap: Record<string, string> = {
  head_of_department: 'Chủ nhiệm',
  deputy_head_of_department: 'Phó Chủ nhiệm',
  acting_head_of_department: 'Phụ trách Chủ nhiệm',
  acting_deputy_head_of_department: 'Phụ trách Phó Chủ nhiệm',
  head_nurse: 'Điều dưỡng trưởng',
};

export const getDoctorTitles = (doctor: any) => {
  const titles: string[] = [];

  // ---- Hospital level ----
  if (doctor?.hospital_title && hospitalMap[doctor.hospital_title]) {
    titles.push(hospitalMap[doctor.hospital_title]);
  }

  // ---- Institute level ----
  const instituteName =
    doctor?.department_groups?.[0]?.department_groups_slug?.title || 'Viện';

  if (doctor?.institute_title && instituteMap[doctor.institute_title]) {
    titles.push(`${instituteMap[doctor.institute_title]} ${instituteName}`);
  }

  // ---- Department level ----
  const departmentName = doctor?.departments?.[0]?.department?.title || 'Khoa';
  const departmentCode = doctor?.departments?.[0]?.department?.code;

  if (doctor?.department_title && departmentMap[doctor.department_title]) {
    titles.push(
      `${departmentMap[doctor.department_title]} ${departmentName} (${departmentCode})`,
    );
  }

  return titles;
};
