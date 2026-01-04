This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Note Scrollsmoother gsap

- config

```jsx
useGSAP(() => {
  const smoother = ScrollSmoother.create({
    content: '#smooth-content',
    wrapper: '#smooth-wrapper',
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
    ignoreMobileResize: true,
    normalizeScroll: {
      target: '.scrollable-area',
      allowNestedScroll: true,
      lockAxis: true,
      allowClicks: true,
    },
  });
});
```

- Cách hoạt động: #smooth-wrapper là một div có position fixed h-screen w-screen, #smooth-content là một div chứa cả page có css transform matrix3d (translateY), gsap sẽ dùng Observer theo dõi cuộn chuột (vị trí, tốc độ,...) trên body và sẽ translateY #smooth-content tương ứng và thêm ease tạo hiệu ứng smooth

- Không sử dụng được position fixed, sticky bên trong #smooth-wrapper vì #smooth-content là một div transform nên các el sẽ fixed,, sticky theo #smooth-content chứ không phải viewport, ===> có 2 cách: + Sử dụng position fixed, sticky bên ngoài #smooth-wrapper hoặc Sử dụng Scrolltrigger với pin (dùng getPositionFixed để responsive)
  VD:

```JSX
useGSAP(() => {
    ScrollTrigger.create({
        trigger: ".fixed-element",
        start: "top 69px", // cách top 69px, responsive thì dùng kết hợp với gsap.matchMedia
        end: 'max',
        pin: true,
        pinSpacing: false,
    });
}, { scope: container });
```

- ignoreMobileResize: true không chặn được hoàn toàn việc thanh địa chỉ phóng to thu gọn trên mobile, đặc biệt trên ios, cũng như việc cuộn quá mạnh trên ios

- Tạo modal vẫn sẽ cuộn được trang do scrollsmoother bắt sự kiện cuộn chuột và translateY #wrapper-content ===> lưu smoother vào context và gọi smoother.paused(true) khi mở modal và smoother.paused(false) khi đóng modal

- Với các component gọi API như tin tức, product, sẽ render dữ liệu sau khi DOM được khỏi tạo và sau khi code ScrollSmoother chạy và sẽ làm thay đổi chiều cao của trang web dẫn tới breakpoint của scrollTrigger bị hỏng, và làm page xuất hiện khoảng trắng(spacing) hoặc bị cắt xén mất ===> gọi ScrollTrigger.refesh() sau khi gọi API. các component làm thay đổi chiểu cao của page cũng tương tự (như According, ...) (đã config vào smoothwrapper)

```jsx
try {
} catch {
} finally {
  ScrollTrigger.refresh();
}
```

- Vùng cuộn con trong #smooth-content sẽ không thể cuộn do #smooth-content là một div transform translate ===> config  
  normalizeScroll: {
  target: '.scrollable-area',
  allowNestedScroll: true,
  lockAxis: true,
  allowClicks: true
  },
  Đặt class là scrollable-area cho các vùng cuộn con trong page

- Không tạo hiệu ứng translateY kết hợp với scrollTrigger cho 2 el lồng nhau (cả 2 el đều translateY), vì breakpoint start của el con sẽ sai (bị dịch đi) do translateY của el cha

- Với các section gọi api dữ liệu như post, product, sẽ re-render comp làm animation do scrolltriger tạo bị lỗi, cần thêm dependency là data state vào useGSAP tạo scrolltrigger, và check data ở jsx nếu tồn tại mới mount đoạn jsx chứa animation

```jsx
{
  dataState && (
    <AnimatedOnScroll>
      <div></div>
    </AnimatedOnScroll>
  );
}
```

- Với các section

## Note SplitText gsap

- Cẩn revert text về dạng ban đầu(không bị split), sau khi hoạt ảnh chạy xong ===> gọi hàm reverrt()

- Nếu cắt theo ký tự, khi revert sẽ bị nhảy chữ do kerning giữa các ký tự ở text ban đầu ===> thêm vào file css font-kerning: none; -webkit-text-rendering: optimizeSpeed;

```css
* {
  font-kerning: none;
  -webkit-text-rendering: optimizeSpeed;
  text-rendering: optimizeSpeed;
  -webkit-font-feature-settings: normal;
  font-feature-settings: normal;
}
```

- Chờ DOM tải font xong rồi mới tách text

```jsx
document.fonts.ready.then(() => {
  // split text ở đây
});
```

- Khi cắt với các text có font không phải font mặc định, thì các ký tự, chữ cái sau khi cắt sẽ sai font (lấy font mặc định) ===> css font vào các thẻ con bị cắt

```css
.font-trajanPro3 * {
  font-family: 'Trajan-Pro3', sans-serif !important;
}
```

- FOUC: trường hợp các chữ hiện ra lần đầu khi load trang rồi mới cắt chữ và chạy animation

  - VD: các text xuất hiện ở đầu trang có hiệu ứng fade, khi load trang sẽ xuất hiện các chữ bị nháy sau đó mới cắt text và chạy animation fade
  - là do web sẽ chạy jsx trước sau đó mới chạy code gsap cho nên chữ sẽ bị nháy
  - fix: set opacity = 0 css ban đầu cho các text, trong hàm gsap sẽ set opacity trở lại 1 rồi bắt đầu cắt chữ và thêm animation

- Không thể thêm backgound gradient cho text bị cắt do các ký tự, chữ cái, dòng sẽ là một div con sau khi bị cắt lên gradient không áp dụng lên các div con bên trong
  ===> cắt text theo ký tự và sử dụng gsap.utils.interpolate để nội suy tuyến tính mảng màu cho các ký tự

```JSX
useGSAP(() => {
    const textColor = gsap.utils.interpolate([
      '#B6832A',
      '#F1B932',
      '#CD9D5B',
    ]); // gradient từ trái sang phải
    SplitText.create(element, {
      type: 'chars, words',
      autoSplit: true,
      onSplit: (instance) => {
        gsap.set(instance.chars, {
          color: (index, target, targets) =>
            textColor(index / (targets.length - 1)),
        });
      },
    });
})
```

- Text align: justify không có tác dụng khi cắt theo lines, vì align justify chỉ áp dụng cho đoạn văn nhiều dòng và dòng cuối sẽ không được justify, mà khi cắt theo lines thì mỗi dòng là một div (tương đương với dòng cuối) nên justify không có tác dụng
  ===> thêm text-align-last: justify cho các lines ngoại trừ lines cuối cùng

```css
.line-justify p .split-line:not(:last-child) {
  text-align: justify !important;
  text-align-last: justify !important;
}
```

- Nếu tạo animation cho một đoạn văn đoạn có nhiều thẻ p,span ví dụ như dùng dangerouslySetInnerHTML, mỗi thẻ p, span là một tween, add lần lượt vào timeline. vì stagger là dùng cho targets trong splitText của một tween, cho nên cần thêm position param cho từng tween trong timeline để tạo cảm giác stagger khi chạy animation giữa các tween

* ví dụ target là lines và stagger: 0.1

```jsx
   elements.forEach((element: any) => {
    SplitText.create(element, {
      type: "lines",
      onSplit: (instance) => {
        const target = instance[splitType];

        const groupStagger = typeof stagger === 'number' ? stagger : 0.1;
        const groupDelay = (target.length - 1) * groupStagger;

        tl.add(
          gsap.from(target, {
            y: 50,
            stagger,
          }),
          currentTime,
        );

        currentTime += groupDelay;
      },
    });
  });
```

- Nếu cắt theo lines, khi responsive thay đổi breakpoint, các lines sẽ không tự thay đổi do trước đó đã cắt và thay đổi DOM, thêm autoSplit: true

- Trường hợp cần có 2 text giống nhau đè lên nhau cần tách riêng 2 text ra chứ không tách trong một lần

- Về hiệu suất
  - Tách càng nhiều hiệu suất càng kém, với các heading có thể tách theo chars, còn các đoạn văn bản chỉ nên tách theo lines
  - Với các text có animation liên quan tới ví dụ như filter blur cũng sẽ gây ảnh hưởng
