"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import AddressForm from "@/components/form/address-form";
import { Plus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UpdateAddressForm from "@/components/form/update-address-form";
import dynamic from "next/dynamic";
import { fetchFromAPIWithCredentials } from "@/lib/helper";
import RecaptchaProvider from "@/app/[locale]/(public)/CaptchaWrapper";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

function ShippingCard({ item, onEdit, t, c }) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 flex">
      <div className="w-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5 transition hover:shadow-sm relative flex flex-col">
        <Heading
          as="div"
          size="heading5"
          className="font-medium text-[#282828] mb-1 xl:mb-2"
        >
          {item?.shippingFullName}
        </Heading>
        <Text
          as="div"
          size="text3"
          className="text-[#282828] mb-2 xl:mb-2.5 flex-1"
        >
          {item?.shipping_address && parse(item?.shipping_address)}
        </Text>
        <div className="flex gap-0.5 xl:gap-1 flex-wrap mt-auto">
          <Button
            variant={"white"}
            onClick={() => onEdit(item)}
            className="min-w-[45px] xl:min-w-[50px] 2xl:min-w-[70px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-black hover:bg-white hover:border-[#f17423]"
          >
            <Image
              src={"/images/icon-edit.svg"}
              alt={"icon-edit"}
              width={10}
              height={10}
              className="w-2 xl:w-2.5"
              quality={90}
            />
            {c("edit")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddressCard({
  item,
  isDeleting,
  onEdit,
  onSetDefault,
  onDelete,
  t,
  c,
}) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 flex">
      <div
        className={cn(
          "w-full bg-white border p-2.5 xl:p-3.5 2xl:p-5 transition hover:shadow-sm relative flex flex-col",
          item.is_default ? "border-[#f17423]" : "border-[#dedede]",
        )}
      >
        <Heading
          as="div"
          size="heading5"
          className="font-medium text-[#282828] mb-1 xl:mb-2"
        >
          {item?.fullName}
        </Heading>
        <Text as="div" size="text3" className="text-[#282828] mb-1 xl:mb-2">
          {item?.streetAddress && parse(item?.streetAddress)}
        </Text>
        <Text
          as="div"
          size="text3"
          className="font-medium text-[#282828] mb-2 xl:mb-2.5 flex-1"
        >
          <a
            href={`tel:${item?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item?.phone}
          </a>
        </Text>
        <div className="flex gap-0.5 xl:gap-1 flex-wrap mt-auto">
          <Button
            variant={"white"}
            onClick={() => onEdit(item)}
            className="min-w-[45px] xl:min-w-[50px] 2xl:min-w-[70px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-black hover:bg-white hover:border-[#f17423]"
          >
            <Image
              src={"/images/icon-edit.svg"}
              alt={"icon-edit"}
              width={10}
              height={10}
              className="w-2 xl:w-2.5"
              quality={90}
            />
            {c("edit")}
          </Button>
          {item.is_default ? (
            <Button
              variant={"white"}
              disabled={true}
              className="min-w-[50px] xl:min-w-[60px] 2xl:min-w-[80px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] gap-1 border border-[#e9e9e9] text-white bg-[#f17423] border-[#f17423] disabled:opacity-100"
            >
              {t("default")}
            </Button>
          ) : (
            <Button
              variant={"white"}
              onClick={() => onSetDefault(item.id)}
              className="min-w-[70px] xl:min-w-[80px] 2xl:min-w-[100px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-black hover:bg-white hover:border-[#f17423]"
            >
              {t("set_default")}
            </Button>
          )}
          <Button
            variant={"white"}
            onClick={() => onDelete(item?.id)}
            disabled={isDeleting === item?.id}
            className="min-w-[55px] xl:min-w-[60px] 2xl:min-w-[85px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-red-600 hover:bg-white hover:border-red-600"
          >
            <Image
              src={"/images/icon-delete.svg"}
              alt={"icon-delete"}
              width={10}
              height={10}
              className="w-2 xl:w-2.5"
              quality={90}
            />
            {isDeleting === item?.id ? t("deleting") : c("delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AccountAddress({ data, locale, addressData }) {
  const t = useTranslations("address");
  const a = useTranslations("account");
  const c = useTranslations("common");
  const tTost = useTranslations("toast");
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editMode, setEditMode] = useState("billing"); // "billing" | "shipping"
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isDeleteItem, setisDeleteItem] = useState(false);

  const sortByDefault = (arr) =>
    [...arr].sort((a, b) => {
      if (a.is_default && !b.is_default) return -1;
      if (!a.is_default && b.is_default) return 1;
      return 0;
    });

  // All records from the API are billing addresses; shipping is embedded inside each
  const billingAddresses = addressData ? sortByDefault(addressData) : [];

  // Shipping entries are those billing records that have an embedded shipping_address
  const shippingAddresses = addressData
    ? addressData.filter((a) => a.shipping_address)
    : [];

  const handleEditClick = async (address) => {
    setEditMode("billing");
    setIsLoadingEdit(true);
    setIsEditDialogOpen(true);

    // Fetch full address data from GET /api/frontend/address/:id
    const { data, error } = await fetchFromAPIWithCredentials(
      `/api/frontend/address/${address.id}`,
    );

    if (!error && data) {
      setEditingAddress(data);
    } else {
      setEditingAddress(address); // Fallback to list data
    }
    setIsLoadingEdit(false);
  };

  const handleShippingEditClick = async (address) => {
    setEditMode("shipping");
    setIsLoadingEdit(true);
    setIsEditDialogOpen(true);

    const { data, error } = await fetchFromAPIWithCredentials(
      `/api/frontend/address/${address.id}`,
    );

    if (!error && data) {
      setEditingAddress(data);
    } else {
      setEditingAddress(address);
    }
    setIsLoadingEdit(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setTimeout(() => {
      setEditingAddress(null);
      router.refresh();
    }, 50);
  };

  const handleSetDefault = async (addressId) => {
    try {
      const { error } = await fetchFromAPIWithCredentials(
        `/api/frontend/address/${addressId}/default`,
        {
          method: "PUT",
        },
      );

      if (!error) {
        router.refresh();
      }

      toast.success(`${tTost("default_address")}`);
    } catch (error) {
      toast.error(`${tTost("failed_default_address")}`);
    }
  };

  const handleDelete = async (addressId) => {
    setIsDeleting(addressId);
    setisDeleteItem(true);
    try {
      const { data, error, message } = await fetchFromAPIWithCredentials(
        `/api/frontend/address/${addressId}`,
        {
          method: "DELETE",
        },
      );

      if (!error) {
        router.refresh();
      }
      setIsDeleting(null);
      setisDeleteItem(false);

      toast.success(`${tTost("delete_address")}`);
    } catch (error) {
      toast.error(`${tTost("failed_delete_address")}`);
    }
  };

  console.log("addressdata: ", addressData);

  return (
    <>
      {!addressData || addressData?.length === 0 ? (
        // Show form when no addresses exist
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <Heading
            as="h4"
            size="heading5"
            className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
          >
            {t("add_new")}
          </Heading>
          <RecaptchaProvider>
            <AddressForm
              onSuccess={() => {
                setShowAddForm(false);
                router.refresh();
              }}
              locale={locale}
            />
          </RecaptchaProvider>
        </div>
      ) : (
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <div className="flex flex-wrap gap-4 justify-between mb-4 xl:mb-5">
            <div className="flex-1">
              <Heading
                as="h2"
                size={"heading5"}
                className="font-semibold text-[#282828] mb-1 xl:mb-3"
              >
                {a("manage_address")}
              </Heading>

              <Text as="div" size="text3" className="text-[#282828]">
                {t("address_info")}
              </Text>
            </div>

            <MediaQuery minWidth={640}>
              <div>
                <Button
                  variant={"black"}
                  disabled={false}
                  onClick={() => setShowAddForm((prev) => !prev)}
                  className={cn(
                    "min-w-[130px] xl:min-w-[155px] 2xl:min-w-[240px]",
                    showAddForm && "bg-[#f17423]",
                  )}
                >
                  <Plus className="size-3" />
                  {t("add_new")}
                </Button>
              </div>
            </MediaQuery>
          </div>

          {/* Billing Address Section */}
          {billingAddresses.length > 0 && (
            <div className="mb-5 xl:mb-7 2xl:mb-10">
              <Heading
                as="h3"
                size="heading5"
                className="font-semibold text-[#282828] mb-2 xl:mb-3"
              >
                {t("billing")}
              </Heading>
              <div className="flex flex-wrap -mx-2 xl:-mx-3 2xl:-mx-4 [&>*]:px-2 [&>*]:py-1 xl:[&>*]:px-3 xl:[&>*]:py-1.5 2xl:[&>*]:px-4 2xl:[&>*]:py-2">
                {billingAddresses.map((item, index) => (
                  <AddressCard
                    key={"billing-item-" + index}
                    item={item}
                    isDeleting={isDeleting}
                    onEdit={handleEditClick}
                    onSetDefault={handleSetDefault}
                    onDelete={handleDelete}
                    t={t}
                    c={c}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Shipping Address Section */}
          {shippingAddresses.length > 0 && (
            <div className="mb-5 xl:mb-7 2xl:mb-10">
              <Heading
                as="h3"
                size="heading5"
                className="font-semibold text-[#282828] mb-2 xl:mb-3"
              >
                {t("shipping")}
              </Heading>
              <div className="flex flex-wrap -mx-2 xl:-mx-3 2xl:-mx-4 [&>*]:px-2 [&>*]:py-1 xl:[&>*]:px-3 xl:[&>*]:py-1.5 2xl:[&>*]:px-4 2xl:[&>*]:py-2">
                {shippingAddresses.map((item, index) => (
                  <ShippingCard
                    key={"shipping-item-" + index}
                    item={item}
                    onEdit={handleShippingEditClick}
                    t={t}
                    c={c}
                  />
                ))}
              </div>
            </div>
          )}

          <MediaQuery maxWidth={640}>
            <div className="w-full flex mb-3 ">
              <Button
                variant={"black"}
                disabled={false}
                onClick={() => setShowAddForm((prev) => !prev)}
                className="min-w-[140px] xl:min-w-[155px] 2xl:min-w-[240px] ml-auto"
              >
                <Plus className="size-3" />
                {t("add_new")}
              </Button>
            </div>
          </MediaQuery>

          {showAddForm && (
            <div className="w-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5 mb-5 xl:mb-10 2xl:mb-12">
              <Heading
                as="h4"
                size="heading5"
                className="font-normal text-[#282828] mb-3 xl:mb-4 2xl:mb-6"
              >
                {t("add_new")}
              </Heading>
              <RecaptchaProvider>
                <AddressForm
                  locale={locale}
                  onSuccess={() => {
                    setShowAddForm(false); // ✅ close form
                    router.refresh(); // ✅ reload page data
                  }}
                />
              </RecaptchaProvider>
            </div>
          )}
        </div>
      )}
      <AlertDialog
        dir={locale === "ar" ? "rtl" : "ltr"}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <AlertDialogContent
          className={"xl:max-w-[768px] 2xl:max-w-[840px] gap-0"}
        >
          <AlertDialogHeader
            className={"flex-row items-center justify-between mb-2 2xl:mb-4"}
          >
            <AlertDialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
              {t("edit_title")}
            </AlertDialogTitle>
            <AlertDialogDescription className={"sr-only"}>
              {t("edit_description")}
            </AlertDialogDescription>
            <AlertDialogCancel className={"h-auto! p-0!"}>
              <X className="size-5 text-black" />
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)] overflow-y-auto overflow-x-hidden">
            {isLoadingEdit ? (
              <div className="flex items-center justify-center py-10">
                <span className="text-sm text-gray-500">{t("loading")}</span>
              </div>
            ) : (
              <RecaptchaProvider>
                <UpdateAddressForm
                  locale={locale}
                  addressData={editingAddress}
                  onSuccess={handleEditSuccess}
                  editMode={editMode}
                />
              </RecaptchaProvider>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
