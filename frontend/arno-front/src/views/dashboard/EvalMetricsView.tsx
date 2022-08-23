import { useEffect, useState } from "react";

import {
  Table,
  Title,
  Space,
  Group,
  ActionIcon,
  Modal,
  Button,
  Textarea,
  Input,
  Radio,
} from "@mantine/core";
import {
  X,
  Check,
  Edit,
} from "tabler-icons-react";

import { Metric, UserRole } from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToMetrics } from "../../models/utils";
import { MetricsAPI } from "../../api/metrics";
import { RoleDict } from "../../assets/consts";
import { showNotification } from "@mantine/notifications";
import { useForm } from '@mantine/form';
import {useAppDispatch} from "../../redux/hooks";
import {useLocation} from "react-router-dom";
import {setSteps} from "../../redux/intro";
import {EvalMetricSteps, SystemFeedbackSteps} from "../../assets/IntroSteps";

const TITLE = "معیارهای ارزیابی";

const EvalMetricsView = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [toRemoveMetricID, setToRemoveMetricID] = useState<number | null>(null);
  const [toEditMetric, setToEditMetric] = useState<Metric | null>(null);
  const [metricFormModalOpened, setMetricFormModalOpened] = useState(false);

  const getData = async () => {
    let res = await MetricsAPI.getInstance().get([]);
    if (res.success) {
      const data = APIDataToMetrics(res);
      setMetrics(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dashboard/evaluation_metrics") {
      dispatch(setSteps(EvalMetricSteps))
    }
  }, [location.pathname]);

  const editMetric = async (values: any) => {
    const metric = toEditMetric;
    const newValues = {
      user_type: values["userType"],
      ...values,
    };

    if (metric === null) {
      const res = await MetricsAPI.getInstance().add(newValues);
      if (res.success) {
        showNotification({
          title: "عملیات موفقیت‌آمیز",
          message: "معیار ارزیابی با موفقیت اضافه شد.",
          color: "teal",
          icon: <Check size={18} />,
        });
      }
    } else {
      const res = await MetricsAPI.getInstance().edit(metric!.id, newValues);
      if (res.success) {
        showNotification({
          title: "عملیات موفقیت‌آمیز",
          message: "معیار ارزیابی با موفقیت ویرایش شد.",
          color: "teal",
          icon: <Check size={18} />,
        });
      }
    }
    setMetricFormModalOpened(false);
    setToEditMetric(null);
    getData();
  };

  const removeMetric = async () => {
    const id = toRemoveMetricID;

    const res = await MetricsAPI.getInstance().remove(id!);

    if (res.success) {
      setToRemoveMetricID(null);
      getData();
      showNotification({
        title: "حذف موفقیت‌آمیز",
        message: "معیار ارزیابی با موفقیت حذف شد.",
        color: "teal",
        icon: <Check size={18} />,
      });
    }
  };

  let editMetricForm = useForm({
    initialValues: {
      title: toEditMetric?.title,
      description: "",
      userType: "",
    },
  });

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Group position="apart">
        <Title order={2}>{TITLE}</Title>
        <Button
            className="tour-add-metric-button"
          variant="light"
          size="xs"
          color="violet"
          onClick={() => {
            setToEditMetric(null);
            setMetricFormModalOpened(true);
          }}
        >
          افزودن معیار جدید
        </Button>
      </Group>
      <Space h="lg" />
      <Table className="tour-metric-table" striped verticalSpacing="lg">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>عنوان</th>
            <th>توضیحات</th>
            <th>نقش مربوطه</th>

            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, i) => {
            return (
              <tr key={i}>
                <td>{m.id}</td>
                <td>{m.title}</td>
                <td>{m.description}</td>
                <td>{RoleDict[m.userType]}</td>
                <td>
                  <Group>
                    <ActionIcon
                      onClick={() => {
                        editMetricForm.setValues({
                          title: m.title,
                          description: m.description,
                          userType: m.userType,
                        });
                        setToEditMetric(m);
                        setMetricFormModalOpened(true);
                      }}
                    >
                      <Edit color={"#40bfa3"} size={22} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        setToRemoveMetricID(m.id);
                      }}
                    >
                      <X color="red" size={22} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        centered
        opened={toRemoveMetricID !== null}
        onClose={() => setToRemoveMetricID(null)}
        title="اخطار"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        آیا از حذف معیار مطمئن هستید؟
        <Group position="right">
          <Button mt="sm" color="red" onClick={() => removeMetric()}>
            حذف
          </Button>
          <Button
            mt="sm"
            color="blue"
            onClick={() => setToRemoveMetricID(null)}
          >
            انصراف
          </Button>
        </Group>
      </Modal>

      <Modal
        centered
        opened={metricFormModalOpened}
        onClose={() => {
          setMetricFormModalOpened(false);
          setToEditMetric(null);
        }}
        title="افزودن/ویرایش معیار"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <form onSubmit={editMetricForm.onSubmit(editMetric)}>
          <Input
            mt="sm"
            placeholder="عنوان"
            required
            {...editMetricForm.getInputProps("title")}
          />
          <Textarea
            mt="sm"
            placeholder="توضیحات معیار"
            label="توضیحات"
            autosize
            minRows={4}
            maxRows={6}
            required
            {...editMetricForm.getInputProps("description")}
          />
          <Radio.Group
            mb="sm"
            label="کاربر مربوطه"
            description="مشخص کنید معیار در نظرسنجی کدام کاربر مورد استفاده قرار گیرد."
            spacing="xl"
            color="cyan"
            {...editMetricForm.getInputProps("userType")}
            required
          >
            <Radio value={UserRole.Customer} label="مشتری" />
            <Radio value={UserRole.Specialist} label="متخصص" />
          </Radio.Group>
          <Group position="right">
            <Button mt="md" color="blue" type="submit">
              ثبت
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default EvalMetricsView;
