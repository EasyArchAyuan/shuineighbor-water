#!/usr/bin/env python3
"""校验静态导出产物 out/ 的内容与合规断言。

用法:
    python scripts/verify_out.py            # 在项目根目录执行
    python scripts/verify_out.py <项目根>

退出码 0 = 全部通过；1 = 有必须项失败。
"""
import glob
import os
import re
import sys

# ── 必须出现（任一页面缺失即失败）────────────────────────────
MUST_HAVE = [
    ("品牌名", "水邻居"),
    ("订水主号", "13393067179"),
    ("法律实体", "廊坊市美好商贸有限公司"),
    ("母品牌背书", "美好水业"),
    ("站点域名", "linju.meihaowater.site"),
]

# ── 禁止出现（全站任意 html 命中即失败）──────────────────────
MUST_NOT_HAVE = [
    ("品类口径违规", "矿泉水"),
    ("母站遗留域名", "meihaoshuiye.cn"),
    ("母站遗留标语", "好水，在身边"),
    ("母站标题后缀", "廊坊本地饮水服务品牌"),
    ("已弃用公众号名", "水邻居饮用水"),
]

EXPECTED_ROUTES = ["", "about", "contact", "products", "source"]


def main(argv) -> int:
    root = os.path.abspath(argv[0] if argv else ".")
    out = os.path.join(root, "out")
    if not os.path.isdir(out):
        print(f"❌ 找不到 {out} —— 先跑 npm run build")
        return 1

    html_files = sorted(glob.glob(os.path.join(out, "**", "*.html"), recursive=True))
    if not html_files:
        print("❌ out/ 下没有 html")
        return 1

    blobs = {}
    for f in html_files:
        rel = os.path.relpath(f, out).replace(os.sep, "/")
        blobs[rel] = open(f, encoding="utf-8", errors="replace").read()
    joined = "\n".join(blobs.values())

    print(f"产物根目录 : {out}")
    print(f"页面数     : {len(blobs)}（{', '.join(sorted(blobs))}）\n")

    failures = []

    print("── 必须出现 ──")
    for label, needle in MUST_HAVE:
        hits = sum(1 for s in blobs.values() if needle in s)
        ok = hits > 0
        print(f"  {'OK  ' if ok else 'FAIL'} {label:<10} {needle}  （{hits} 个页面命中）")
        if not ok:
            failures.append(f"缺失：{label} {needle}")

    print("\n── 禁止出现 ──")
    for label, needle in MUST_NOT_HAVE:
        bad = [p for p, s in blobs.items() if needle in s]
        ok = not bad
        print(f"  {'OK  ' if ok else 'FAIL'} {label:<12} {needle}  （{len(bad)} 处）")
        if bad:
            failures.append(f"不该出现：{label} {needle} → {bad[:3]}")

    print("\n── 路由齐备 ──")
    for r in EXPECTED_ROUTES:
        p = "index.html" if r == "" else f"{r}/index.html"
        ok = p in blobs
        print(f"  {'OK  ' if ok else 'FAIL'} /{r}")
        if not ok:
            failures.append(f"路由缺失：/{r}")

    print("\n── sitemap ──")
    sm = os.path.join(out, "sitemap.xml")
    if os.path.isfile(sm):
        xml = open(sm, encoding="utf-8", errors="replace").read()
        locs = re.findall(r"<loc>([^<]+)</loc>", xml)
        print(f"  条目 {len(locs)} 条")
        for u in locs:
            print(f"    {u}")
        wrong = [u for u in locs if "linju.meihaowater.site" not in u]
        if wrong:
            failures.append(f"sitemap 域名错误：{wrong}")
            print("  FAIL sitemap 含非本站域名")
        else:
            print("  OK  全部指向本站域名")
    else:
        failures.append("缺少 sitemap.xml")
        print("  FAIL 缺少 sitemap.xml")

    print("\n── 占位统计（信息性，不算失败）──")
    ph = joined.count("TODO: REPLACE_WITH_REAL_IMAGE")
    lg = joined.count("TODO: REPLACE_WITH_REAL_LOGO")
    print(f"  图片占位 {ph} 处 ｜ logo 占位 {lg} 处")
    print("  待补素材清单见 README.md")

    size = sum(os.path.getsize(f) for f in glob.glob(os.path.join(out, "**", "*"), recursive=True) if os.path.isfile(f))
    print(f"\n产物体积   : {size / 1048576:.2f} MB")

    print()
    if failures:
        print("结果: ❌ 有 %d 项未通过" % len(failures))
        for f in failures:
            print("   -", f)
        return 1
    print("结果: ✅ 全部通过")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
